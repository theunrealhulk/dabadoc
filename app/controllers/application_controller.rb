require 'TokenManager'
class ApplicationController < ActionController::API
    include TokenManager

    def create_token(user_id,email)
        return generate_token(user_id,email)
    end

    def check_token()
        user_token = decrypt_token(request.headers['token'])
        if user_token 
            account = User.find(user_token[:id])
            if account
                if user_token[:token_ex].to_i < Time.now.to_i  || account.token!= request.headers['token']
                    render json:{ msg:'Token expired'},status: :unauthorized
                else
                    return true
                end
            else
                render json: { msg:'Unauthorized'},status: :unauthorized
            end
        else
            render json: { msg:'Unauthorized Invalid Token'},status: :unauthorized
        end
    end
end
