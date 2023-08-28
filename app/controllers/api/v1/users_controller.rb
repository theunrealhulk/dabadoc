class Api::V1::UsersController < ApplicationController
    before_action :getUser,only: [:getFavorites,:showUser]
    def getUsers
        user = User.all()
        if user
            render json: @user ,status: :ok
        else
            render json:{msg:"No Data"}, status: :unprocessable_entity
        end
    end
    def showUser
        if @user
            render json: @user, status: :ok
        else
            render json:{msg:"User Not found"}, status: :unprocessable_entity
        end
    end

    def addUser
        user = User.new(userparams)
        if user.save
            render json: user, status: :ok
        else
            render json:{message:"cannot add user", error: user.errors }, status: :unprocessable_entity
        end
    end

    def getFavorites
    end

    private
        def userparams
            params.permit(:email, :password)
        end
        def getUser
            @user = User.find(params[:id])
        end
end
