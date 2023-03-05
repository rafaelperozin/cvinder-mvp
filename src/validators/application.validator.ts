import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl, Length, Max } from "class-validator";

export class ApplicationStepOneInputs {
  @Length(0, 50)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsUrl({
    require_protocol: true
  })
  linkedin?: string;

  @Max(99999999)
  @IsNumber({})
  salary: number;
}

export class ApplicationStepTreeInputs {
  @Length(0, 140)
  @IsString()
  i_am: string;

  @Length(0, 140)
  @IsString()
  i_like: string;

  @Length(0, 140)
  @IsString()
  i_want: string;

  @Length(0, 140)
  @IsString()
  i_will: string;

  @Length(0, 140)
  @IsString()
  i_am_proud_of: string;
}
