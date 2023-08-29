class Api::V1::UsersController < ApplicationController
    before_action :getUser,only: [
        :authUser,
        :postQuestion,
        :postAnswer,
        :likeQuestion,
        :unlikeQuestion,
        :favorits
    ]

    before_action :check_token,only: [ 
        :authUser,
        :signOut,
        :postQuestion,
        :postAnswer,
        :likeQuestion,
        :unlikeQuestion,
        :favorits,
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
            render json: {user:@user.json,ok:true}, status: :ok
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
                render json: { questions: questions, ok: true }, status: :ok
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
        render json: {msg:"getQuestion.."} ,status: :ok
    end

    def postAnswer
        render json: {msg:"postAnswer.."} ,status: :ok
    end

    def likeQuestion
        render json: {msg:"likeQuestion.."} ,status: :ok
    end

    def unlikeQuestion
        render json: {msg:"unlikeQuestion.."} ,status: :ok
    end

    def favorits
        render json: {msg:"favorits.."} ,status: :ok
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
