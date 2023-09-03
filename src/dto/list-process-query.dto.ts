import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class ListProcessQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  startDate?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  processNumber?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  summary?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  itemDescription?: string

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: 1 })
  page: number = 1

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: 25 })
  take: number = 25
}
