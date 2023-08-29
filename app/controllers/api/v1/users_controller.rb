class Api::V1::UsersController < ApplicationController
    before_action :getUser,only: [
        :authUser,
        :postQuestion,
        :postAnswer,
        :toggleFavorites,
        :getQuestion
    ]

    before_action :check_token,only: [ 
        :authUser,
        :signOut,
        :postQuestion,
        :postAnswer,
        :toggleFavorites,
        :listQuestions,
        :getQuestion
    ]
    def getUsers
        user = User.all()
        if user
            render json: {user:user,ok:'true'} ,status: :ok
        else
            render json:{msg:"No Data",ok:'false'}, status: :unprocessable_entity
        end
    end

    def authUser
        if @user
            render json: {user:@user,ok:true}, status: :ok
        else
            render json:{msg:"User Not found",ok:false}, status: :unprocessable_entity
        end
    end

    def signUp
        user = User.new(userparams)
        if user.save
            render json: {user:user,ok:'true'}, status: :ok
        else
            render json:{msg:"cannot add user ", error: user.errors,ok:'false' }, status: :unprocessable_entity
        end
    end

    def signIn
        user = User.find_by(:email=>params[:email])

        if !user
          render json: { msg:'invalid email or password',ok:'false'},status: :unprocessable_entity
          return true
        end
        if user.authenticate(params[:password])
          token=self.create_token(user.id.to_s, user.email.to_s)
          user.set(:token =>token)
          render json: { msg:'connected!', token: user.token,ok:'true'},status: :ok
        else
          render json:{msg:"invalid email or password",ok:'false'}, status: :unprocessable_entity
        end
    end

    def signOut
        user = User.find_by(token: request.headers['token'])
        
        if user
            user.update(token: nil)
            if user.save
                render json: { msg: 'Logged out successfully',ok:'true'  }, status: :ok
            else
                render json: { msg: 'cannot update user',user:user ,ok:'false' }, status: :unprocessable_entity
            end
        else
            render json: { msg: 'no user with the given token',ok:'false'}, status: :unprocessable_entity
        end
    end

    def postQuestion
        if @user
            question = @user.questions.build(
                title: params[:title],
                content: params[:content],
                location: params[:location]
            )
            questions = Question.order_by(location: 1).collation(locale: "en", strength: 2)
            if question.save
                render json: questions  , status: :ok
            else
                render json: { msg: "Unable to save question", errors: question.errors, ok: false }, status: :unprocessable_entity
            end
        else
            render json: { msg: "Unable to get authenticated user", ok: false }, status: :unprocessable_entity
        end
    end

    def listQuestions

        token = request.headers['token']
        user = User.find_by(token: token)
    
        if user
    
            questions = Question.order_by(location: 1).collation(locale: "en", strength: 2)
            render json:questions , status: :ok
        else
            render json: { msg: "Unable to get authenticated user", ok: false ,token:token,user:user}, status: :unprocessable_entity
        end
    end

    def getQuestion
        if @user
            question = Question.find_by(id: params[:questionId])
            if question
                render json:question  ,status: :ok
            else
                render json: {msg:"could get question",ok:false} ,status: :unprocessable_entity
            end
        else
            render json: {msg:"could get authenticated User",ok:false} ,status: :unprocessable_entity
        end
    end

    def postAnswer
        if @user
            question = Question.find_by(id:params[:questionId])
            if question
                question.answers.push(@user.email + " : " + params[:answer])
                if question.save
                    questions = Question.order_by(location: 1).collation(locale: "en", strength: 2)
                    render json: questions,status: :ok
                else
                    render json: {msg:"could find update question",ok:false} ,status: :unprocessable_entity
                end
            else
                render json: {msg:"could find the question to answer",ok:false} ,status: :unprocessable_entity
            end
        else
            render json: {msg:"could get authenticated User",ok:false} ,status: :unprocessable_entity
        end
        #render json: {msg:"postAnswer.."} ,status: :ok
    end

    def toggleFavorites
        if @user
             if @user.favorites.include?(params[:questionId])
                #remove
                @user.favorites.delete(params[:questionId])
            else
                #add
                @user.favorites.push(params[:questionId])
            end
            if @user.save
                render json: {user:@user} ,status: :ok
            else
                render json: {msg:"could not update user.."} ,status: :ok
             end
        else
            render json: {msg:"could get authenticated User",ok:false} ,status: :unprocessable_entity
        end
    end

    private
        def getUser
            token = request.headers['token']
            @user = User.find_by(token: token)
        end
        def userparams
            params.permit(:email, :password)
        end
end
