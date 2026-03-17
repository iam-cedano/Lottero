export type PartiesIndex = {
  [casinoName: string]: {
    [gameName: string]: {
      [strategyName: string]: {
        [chatId: string]: {
          [command: string]: string;
        };
      };
    };
  };
};
