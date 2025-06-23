export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  interests?:string[];
}

export interface AuthFormProps {
  title: string;
  subtitle?: string;
  formData: AuthFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLogin: boolean;
  error?: string;
  isLoading: boolean;
}

export interface InputFieldProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}