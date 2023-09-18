export interface Topic {
  id: string;
  topicOrder: number;

  name: string;

  pay: boolean;
  isFreeTime: boolean;

  state: 'perfect' | 'imperfect' | 'unfinished';
  videoState: 'perfect' | 'imperfect' | 'unfinished';
  practiceState: 'perfect' | 'imperfect' | 'unfinished';

  chapterId: string;
  subsectionId: string;
  themeId: string;
}
