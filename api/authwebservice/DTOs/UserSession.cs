namespace AuthWebService.DTOs
{
    //GENERATE TOKEN
    public record UserSession(string? Id, string? FirstName, string? LastName, string? Email, string? Role);
}
