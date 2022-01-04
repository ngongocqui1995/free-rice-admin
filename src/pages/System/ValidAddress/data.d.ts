export interface ValidAddressItem {
  createdAt: string;
  id: string;
  host: string;
  status: string;
  updatedAt: string;
}

export interface CreateValidAddress {
  host: string;
}

export interface UpdateValidAddress {
  host: string;
}

export interface QueryValidAddress {
  data: ValidAddressItem[];
  total: number;
  success: boolean;
}

export interface ChangeValidAddress {
  status: string;
  message: string;
}
