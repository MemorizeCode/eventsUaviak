import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
    private readonly colors = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        reset: '\x1b[0m'
    };

    private logToConsole(level: string, message: string, context?: string) {
        const levelColor = this.setColorText(level)
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${levelColor}] ${context ? `[${context}]` : ''} ${message}\n`;
        console.log(logEntry.trim());
    }

    public log(message: string, context?: string) {
        this.logToConsole('LOG', message, context);
    }

    public error(message: string, context?: string) {
        this.logToConsole('ERROR', message, context);
    }

    public warn(message: string, context?: string) {
        this.logToConsole('WARN', message, context);
    }

    public debug(message: string, context?: string) {
        this.logToConsole('DEBUG', message, context);
    }

    public verbose(message: string, context?: string) {
        this.logToConsole('VERBOSE', message, context);
    }

    setColorText(s) {
        let coloredLogEntry: string;
        switch (s) {
            case 'ERROR':
                coloredLogEntry = `${this.colors.red}${s.trim()}${this.colors.reset}`;
                break;
            case 'WARN':
                coloredLogEntry = `${this.colors.yellow}${s.trim()}${this.colors.reset}`;
                break;
            case 'LOG':
                coloredLogEntry = `${this.colors.green}${s.trim()}${this.colors.reset}`;
                break;
            case 'DEBUG':
                coloredLogEntry = `${this.colors.blue}${s.trim()}${this.colors.reset}`;
                break;
            case 'VERBOSE':
                coloredLogEntry = `${this.colors.magenta}${s.trim()}${this.colors.reset}`;
                break;
            default:
                coloredLogEntry = s.trim();
        }
        return coloredLogEntry;
    }
}