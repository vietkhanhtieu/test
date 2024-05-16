namespace KLTN.Utils
{
    public static class IdHelper
    {
        private static readonly object lockObj = new object();
        private static long counter = 0;

        public static string GenerateId()
        {
            lock (lockObj)
            {
                var ticks = DateTime.UtcNow.Ticks.ToString();
                return $"{ticks}";
            }
        }
    }
}
