// note.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put ,ValidationPipe,UseGuards,Query} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(new ValidationPipe({transform:true})) createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @UseGuards(AuthGuard)
//   @Get()
//   async findAll() {
//     return this.noteService.findAll();
//   }

    // get listing with paginatio 
    @Get()
    async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    ) {
    return this.noteService.findAll(page, limit);
    }

    @Get('search')
    async search(
      @Query('query') query: string,
      @Query('page') page: string = '1',
      @Query('limit') limit: string = '10',
    ) {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      return this.noteService.search(query, pageNumber, limitNumber);
    }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }
 
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }

  
}
