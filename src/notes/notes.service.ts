// note.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(createNoteDto);
    return newNote.save();
  }

//   async findAll(): Promise<Note[]> {
//     return this.noteModel.find().exec(); 
//   }

  //pagination example
  // async findAll(page: number = 1, limit: number = 10): Promise<any> {
  //   const skip = (page - 1) * limit;
  //   const notes = await this.noteModel.find().skip(skip).limit(limit).exec();
  //   const total = await this.noteModel.countDocuments().exec();
  //   return {
  //     total,
  //     page,
  //     limit,
  //     notes,
  //   };
  // }

  //pagination example using aggregate function
  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (Number(page) - 1) * Number(limit);
    const limitValue = Number(limit);

    const results = await this.noteModel.aggregate([
        {
            $facet: {
                notes: [
                    { $skip: skip },
                    { $limit: limitValue }
                ],
                total: [
                    { $count: "count" }
                ]
            }
        }
    ]);

    const total = results[0].total.length > 0 ? results[0].total[0].count : 0;
    const notes = results[0].notes;

    return {
        total,
        page,
        limit: limitValue,
        notes,
    };
}



  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedNote = await this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
    if (!updatedNote) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return updatedNote;
  }

  async remove(id: string) {
    const result = await this.noteModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return 'deleted';
  }
  async search(query: string, page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;
    const regex = new RegExp(query, 'i'); // Case-insensitive search
    const notes = await this.noteModel.find({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } }
      ]
    }).skip(skip).limit(limit).exec();
    const total = await this.noteModel.countDocuments({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } }
      ]
    }).exec();
    return {
      total,
      page,
      limit,
      notes,
    };
  }
}
