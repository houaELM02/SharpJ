namespace AuthWebService.DTOs
{
    public class ServiceResponses
    {
        public record class GeneralResponse(bool Flag, string Message);
        public record class LoginResponse(bool Flag,string userId, string Token, string Message);
    }
}
