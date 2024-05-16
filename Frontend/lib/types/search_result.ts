export interface ISearchResult {
  id: string | number
  maSanPhamEc: string
  maSanPhamGonsa: string
  title: string
  tenThuongMai: string
  nhaSanXuat: INhaSanXuat
  nhomDieuTri: INhomDieuTri
  nuocSanXuat: INuocSanXuat
  tenHoatChat: string
  packing: string
  hoatChatDtos: any[]
  dangBaoChe: IDangBaoChe
  donViTinh: string
  regular_price: number
  sale_price: number
  hinhAnh: string
  hoatChatHamLuong: string
}

export interface INhaSanXuat {
  maNhaSanXuat: number
  tenNhaSanXuat: string
  tenVietGon: string
  nuocSanXuat: string
}

export interface INhomDieuTri {
  maNhomDieuTri: number
  tenNhomDieuTri: string
}

export interface INuocSanXuat {
  maNuocSanXuat: number
  tenNuocSanXuat: string
}

export interface IDangBaoChe {
  maDangBaoChe: any
  tenDangBaoCheCap1: any
  tenDangBaoCheCap2: string
  tenDangBaoCheCap3: string
}
