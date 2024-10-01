using AuthWebService.Models;

namespace AuthWebService.Contracts
{
    public interface IEmailService
    {
        public Task<bool> SendEmailAsync(MailRequest mailrequest);
    }
}
