import { SMTPClient} from  'emailjs'
import * as readline from 'node:readline/promises'
import {stdin as input, stdout as output} from 'node:process'


const rl = readline.createInterface({ input, output });
const ask = await rl.question('do you want to send it to one person Y/N:')
const  attach = await rl.question('do you want to send file Y/N:')
const emails = [] //list of emails
const docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const exlvs = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const jpg = 'image/jpeg'
const pptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'

const me = new SMTPClient({
    user: '', 
    password: '', 
    host: '', //smtp.host.com
    ssl: true
});
        if(ask == 'Y' && attach == 'N') {
            const text = await rl.question('enter text:')
            const email = await rl.question('Email to send:')
            const subject = await rl.question('enter subject:')
            try {
                const message = await me.sendAsync({
                    text: text,
                    from: '',
                    to: email,
                    subject: subject,
                    
                });

                console.log(message)
            } catch (err) {
                console.error(err)
            }
        } else if(ask == 'N' && attach == 'N') {
            const text = await rl.question('enter text:')
            const subject = await rl.question('enter subject:')
            for (let i = 0; i < emails.length; i++) {
                try {
                    const message = await me.sendAsync({
                        text: text,
                        from: '',
                        to: emails[i],
                        subject: subject,
                    });

                    console.log(message)
                } catch (err) {
                    console.error(err)
                }
        }
    } else if(ask == 'Y' && attach == 'Y') {
            const text = await rl.question('enter text:')
            const email = await rl.question('Email to send:')
            const subject = await rl.question('enter subject:')
            const path = await rl.question('./filename:')
            const name = await rl.question('name of document:')
            try {
                const message = await me.sendAsync({
                    text: text,
                    from: '',
                    to: email,
                    subject: subject,
                            attachment: [
                                { path: path, type: docx, name: name}
                            ]
                });

                console.log(message)
            } catch (err) {
                console.error(err)
            }
    } else if (ask == 'N' && attach == 'Y') {
            const text = await rl.question('enter text:')
            const subject = await rl.question('enter subject:')
            const path = await rl.question('./filename:')
            const name = await rl.question('name of document:')
            for (let i = 0; i < emails.length; i++) {
                try {
                    const message = await me.sendAsync({
                        text: text,
                        from: '',
                        to: emails[i],
                        subject: subject,
                        attachment: [
                            { path: path, type: docx, name:name}
                        ]
                    });

                    console.log(message)
                } catch (err) {
                    console.error(err)
                }
            }
    }


    
