using AuthWebService.DTOs;
using static AuthWebService.DTOs.ServiceResponses;

namespace AuthWebService.Contracts
{
    public interface IUserAccounts
    {
        Task<GeneralResponse> CreateAccount(UserDTO userDTO);

        // return the token
        Task<LoginResponse> LoginAccount(LoginDTO loginDTO);
        Task<LoginResponse> LoginWithGoogle(string credential);
        

        //forget password
        Task<GeneralResponse> SendMail(string email);
        Task<GeneralResponse> ResetPassword(ResetPasswordDTO model);

        
        
    }
}
