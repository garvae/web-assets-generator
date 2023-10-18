"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorMessage = void 0;
/**
 * Generates an error message using the given parameters
 */
const generateErrorMessage = (props) => {
    const { err: errProp, errMessageTitle, } = props;
    let err = errProp;
    try {
        if (errProp) {
            if (errProp instanceof Error) {
                err = errProp.stack;
            }
            else if (typeof errProp === 'object') {
                err = JSON.stringify(errProp);
            }
            else if (typeof errProp !== 'string') {
                err = String(errProp);
            }
        }
        if (typeof err === 'string') {
            const description = err.length && err !== '{}' ? err : undefined;
            let message = undefined;
            if (description) {
                if (errMessageTitle) {
                    message = `${errMessageTitle}\n${description}`;
                }
                else {
                    message = description;
                }
            }
            if (typeof message === 'string' && message.length) {
                return message;
            }
        }
        return '';
    }
    catch (_a) {
        /* no logs here */
        return '';
    }
};
exports.generateErrorMessage = generateErrorMessage;
