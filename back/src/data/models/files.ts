import { DataTypes, Model, Transaction } from "sequelize";
import sequelize from "../db";

export type FileType = "file" | "directory";

export type ContentType = string | File[];

export interface I_Point {
    x: number;
    y: number;
}

class File extends Model {
    declare id: string;
    declare name: string;
    declare type: FileType;
    declare position: I_Point;
    declare content: ContentType;
}

File.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.ENUM("file", "directory"),
            allowNull: false,
        },
        position: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: { x: 0, y: 0 },
        },
        content: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
    },
    {
        sequelize,
    }
);

export default File;
