import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from './status';

export class Operation {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '8a48ca8e-cc4f-4757-8ec5-ec4681b62dd3',
  })
  id: string;

  @IsString()
  @ApiProperty({
    example: 'Description of operation',
  })
  description: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 123456789,
  })
  timestamp: number;

  @IsNumber()
  @ApiProperty({
    example: 10,
  })
  amount: number;

  @IsEnum(Status)
  @IsOptional()
  @ApiProperty({
    example: Status.Done,
  })
  status: Status;
}
