namespace authwebservice.Models
{
    public class UserGroupePrivilege
    {
        public long id { get; set; }
        public string? id_user { get; set; }
        public long id_groupe { get; set; }
        public string? privileges { get; set; }
    }
}
