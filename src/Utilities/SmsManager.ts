import axios from 'axios';

const { ALIGO_API_URL, ALIGO_API_KEY, ALIGO_USER_ID, ALIGO_SENDER_NUMBER } = process.env;

class SmsManager {
    async send(phonenumber: string, message: string) {
        if (!ALIGO_API_URL || !ALIGO_API_KEY || !ALIGO_USER_ID || !ALIGO_SENDER_NUMBER) {
            return;
        }

        const { data } = await axios.post(ALIGO_API_URL, null, {
            params: {
                key: ALIGO_API_KEY,
                user_id: ALIGO_USER_ID,
                sender: ALIGO_SENDER_NUMBER,
                receiver: phonenumber,
                msg: message,
                msg_type: 'SMS',
            },
        });

        if (data.result_code != 1) {
            return false;
        }

        return true;
    }
}

export default SmsManager;
