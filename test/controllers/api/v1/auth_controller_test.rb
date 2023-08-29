require "test_helper"

class Api::V1::AuthControllerTest < ActionDispatch::IntegrationTest
  test "should get signIn" do
    get api_v1_auth_signIn_url
    assert_response :success
  end
end
