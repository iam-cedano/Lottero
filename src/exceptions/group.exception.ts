export class MessageFormatException extends Error {
  constructor() {
    super(
      `Invalid message format. 
        Expected format: 
        {
          "channel": string
          "data": {
            "command": string
            [key:string]: string
          }
        }`,
    );
  }
}

export class ChannelFormatException extends Error {
  constructor() {
    super(
      `Invalid channel format. 
        Expected formats:
        casino: Broadcast all channels from a casino
        casino-game: Broadcast all channels from a game in a casino
        casino-game-strategy: Send message to a specific group of channels from a casino's game and strategy`,
    );
  }
}

export class DataFormatException extends Error {
  constructor() {
    super(
      `Invalid data format. 
        Expected format: 
        {
          "command": string
          [key:string]: string
        }`,
    );
  }
}
