import { injectable } from 'tsyringe';
import _ from 'lodash';
import KeywordSubscriber from '../model/keywordSubscriber';
import keywordSubscriberRepository from '../repository/keywordSubscriberRepository';

export default {
  keywordMatching(body: string): string {
    const regExp = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/gi;
    let words: string = body.replace(regExp, ' ').replace(/ +/g, '|');
    if (words.substr(-1) === '|') {
      words = words.slice(0, words.length - 1);
    }
    return words;
  },

  async sendMessage(subscribers: KeywordSubscriber[]) {
    // TODO: Send alarm
    const messages = _.map(subscribers, item => {
      return {
        subscriberId: item.id,
        message: `${item.subscriber}님이 등록한 키워드에 새 글(댓글)이 등록되었습니다.`,
      };
    });
    return messages;
  },

  async sendKeywordAlarm(bodyData: string) {
    const keywords = this.keywordMatching(bodyData);
    const subscribers: KeywordSubscriber[] = await keywordSubscriberRepository
      .createQueryBuilder()
      .where('keyword REGEXP :word', { word: bodyData })
      .execute();
    await this.sendMessage(subscribers);
  },
};
