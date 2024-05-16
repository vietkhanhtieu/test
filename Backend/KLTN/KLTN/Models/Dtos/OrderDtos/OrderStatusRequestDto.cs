﻿namespace KLTN.Models.Dtos.OrderDtos
{
    public class OrderStatusRequestDto : BaseRequestDto
    {
        public int Statusid { get; set; }

        public string? Status { get; set; }

        public override object GetId()
        {
            return Statusid;
        }
    }
}
