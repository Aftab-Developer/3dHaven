import mongoose, {Schema,model,Document} from "mongoose";
import { TimeStamps } from "./adminModel"; 

export interface DAU extends Document,TimeStamps {
    uid : string ,
    month : string ,
    day : number
} 

export const daily_active_users_schema = new Schema<DAU>({
    uid : {
        type:String ,
        required:true
    } , 
    month: {
        type:String ,
        required :true
    } ,
    day:{
        type: Number ,
        required:true
    }
},{timestamps:true}); 

export const daily_active_users_model = mongoose.models.DailyActiveUsers as mongoose.Model<DAU>
|| model<DAU>('DailyActiveUsers',daily_active_users_schema) ;