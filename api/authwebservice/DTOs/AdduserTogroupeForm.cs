namespace authwebservice.DTOs
{
    public class AdduserTogroupeForm
    {
        public string id_user { get; set; }
        public long id_groupe { get; set; }

        public string? privileges { get; set; }
    }
}
