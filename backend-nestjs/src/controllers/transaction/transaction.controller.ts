import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDto } from 'src/dto/transaction.dto';
import { PixKey } from 'src/models/pix-key.model';
import {
  Transaction,
  TransactionOperation,
  TransactionStatus,
} from 'src/models/transaction.model';
import { Repository } from 'typeorm';

@Controller('bank-accounts/:bankAccountId/transactions')
export class TransactionController {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(PixKey)
    private pixKeyRepo: Repository<PixKey>,
  ) {}

  @Get()
  index(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }),
    )
    bankAccountId: string,
  ) {
    return this.transactionRepo.find({
      where: {
        bank_account_id: bankAccountId,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  @Post()
  async store(
    @Param(
      'bankAccountId',
      new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }),
    )
    bankAccountId: string,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    body: TransactionDto,
  ) {
    let transaction = this.transactionRepo.create({
      ...body,
      amount: body.amount * -1,
      bank_account_id: bankAccountId,
      operation: TransactionOperation.debit,
    });
    transaction = await this.transactionRepo.save(transaction);

    return transaction;
  }

  async receivedTransaction(data) {
    const pixKey = await this.pixKeyRepo.findOneOrFail({
      where: {
        key: data.pixKeyTo,
        kind: data.pixKeyKindTo,
      },
    });

    const transaction = this.transactionRepo.create({
      external_id: data.id,
      amount: data.amount,
      description: data.description,
      bank_account_id: pixKey.bank_account_id,
      bank_account_from_id: data.accountId,
      operation: TransactionOperation.credit,
      status: TransactionStatus.completed,
    });

    this.transactionRepo.save(transaction);
  }

  async confirmedTransaction(data) {
    await this.transactionRepo.update(
      { id: data.id },
      {
        status: TransactionStatus.completed,
      },
    );
  }
}
