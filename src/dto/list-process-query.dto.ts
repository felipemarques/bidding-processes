import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class ListProcessQueryDto {
  @IsString()
  @IsOptional()
  startDate?: string

  @IsString()
  @IsOptional()
  processNumber?: string

  @IsString()
  @IsOptional()
  summary?: string

  @IsString()
  @IsOptional()
  itemDescription?: string

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  page = 1

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  take = 25
}
