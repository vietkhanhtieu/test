export interface ICheckboxOption {
  id: string
  label: string
  icon?: string
  checked: boolean
}

const ingredientContentOptions: ICheckboxOption[] = [
  {
    id: 'paracetamol_cafein',
    label: 'Paracetamol 650mg; Cafein 65mg',
    checked: false
  },
  {
    id: 'desloratadin_5',
    label: 'Desloratadin 5mg',
    checked: false
  },
  {
    id: 'spor_cov',
    label: 'SPOR-COV, Nước cất, muối, acid citric, methylparaben, hương bạc hà tự nhiên',
    checked: false
  }
]

const dosageFormOptions: ICheckboxOption[] = [
  {
    id: 'vien_nen',
    label: 'Viên nén bao phim',
    checked: false
  },
  {
    id: 'dung_dich',
    label: 'Dung dịch xịt mũi',
    checked: false
  }
]

const priceOptions: ICheckboxOption[] = [
  {
    id: 'under_100',
    label: 'Dưới 100.000đ',
    checked: false
  },
  {
    id: 'between_100_and_300',
    label: '100.000đ đến 300.000đ',
    checked: false
  },
  {
    id: 'between_300_and_500',
    label: '300.000đ đến 500.000đ',
    checked: false
  },
  {
    id: 'above_500',
    label: 'Trên 500.000đ',
    checked: false
  },
  {
    id: 'other',
    label: 'Khác',
    checked: false
  }
]

export { ingredientContentOptions, dosageFormOptions, priceOptions }
