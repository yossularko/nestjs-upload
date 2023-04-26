import { IsNotEmpty } from 'class-validator';

export class SampleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
