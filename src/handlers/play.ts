import { Composer } from 'telegraf';
import { addToQueue } from '../tgcalls';

export const playHandler = Composer.command('play', async ctx => {
    const { chat } = ctx.message;

    if (chat.type !== 'supergroup') {
        await ctx.reply('I can only play in groups.');
        return;
    }

    const [commandEntity] = ctx.message.entities!;
    const text = ctx.message.text.slice(commandEntity.length + 1);

    var re = new RegExp("^https://www.youtube.com/([a-zA-Z0-9])");
    var re2 = new RegExp("^https://youtube.com/([a-zA-Z0-9])");
    var re3 = new RegExp("^https://www.youtu.be/([a-zA-Z0-9])");
    var re4 = new RegExp("^https://youtu.be/([a-zA-Z0-9])");
    if (!text) {
        await ctx.reply('You need to specify a YouTube URL.');
        return;
    } else if (re.test(text) || re2.test(text) || re3.test(text) || re4.test(text)) {
	    const index = await addToQueue(chat, text);

    	await ctx.reply(index === 0 ? 'Playing.' : `Queued at position ${index}.`);

    } else {
        await ctx.reply('Give a valid YouTube URL.');
        return;
    }
});
