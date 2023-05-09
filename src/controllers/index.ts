import 'reflect-metadata'
import { JsonController, Get, Delete, Put, Body, QueryParam, Post } from 'routing-controllers'

import SalaryStatsService from '../services/salary-stats.service'
import { CreateSalaryRecordRequest, DeleteSalaryRecordRequest, GenericSalaryStatsResponse } from '../models'

@JsonController('/user')
export class UserController {
  private salaryStatsService = SalaryStatsService

  @Post('/')
  public async addUser(@Body() body: CreateSalaryRecordRequest): Promise<GenericSalaryStatsResponse> {
    try {
      this.salaryStatsService.addRecord(body.name, parseFloat(body.salary), body.currency, body.sub_department, body.department, body.on_contract)
      return new GenericSalaryStatsResponse(true)
    } catch (err) {
      return new GenericSalaryStatsResponse(false, (err as Error).message)
    }
  }


  public async addUser(@QueryParam('contractOnly', { required: false, type: Boolean }) contractOnly: boolean = false): Promise<GenericSalaryStatsResponse> {
    try {
      const response = this.salaryStatsService.getStats(contractOnly)
      return new GenericSalaryStatsResponse(true, undefined, response)
    } catch (err) {
      return new GenericSalaryStatsResponse(false, (err as Error).message)
    }
  }
}
