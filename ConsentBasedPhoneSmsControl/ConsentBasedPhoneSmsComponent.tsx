import * as React from 'react';
import { 
    Call20Regular, Call20Filled, 
    Chat20Regular, Chat20Filled 
} from '@fluentui/react-icons';
import { 
    FluentProvider, 
    webLightTheme, 
    Input, 
    Button, 
    makeStyles, 
    shorthands 
} from '@fluentui/react-components';

import { AsYouType } from 'libphonenumber-js';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        ...shorthands.gap('4px'),
        width: '100%',
        ...shorthands.borderRadius('4px'),
        overflow: 'hidden',
    },
    input: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        '& .fui-Input__main': {
        backgroundColor: '#f5f5f5',
        ...shorthands.border('0px'),
        },
        '& input': {
        color: '#424242',
        }
    },
    actionButton: {
        minWidth: '32px',
        height: '32px',
        flexShrink: 0,
        backgroundColor: '#e6e6e6',
        color: '#424242',
        ...shorthands.border('0px'),
        ...shorthands.borderRadius('4px'),
        '&:hover': {
            backgroundColor: '#e6e6e6',
            '& svg': {
                color:'#0f6cbd',
            }
        }
    }
});

export interface IPhoneSmsProps {
    phoneNumber: string;
    placeholder: string;
    hidePhone: boolean; 
    hideSMS: boolean;   
    isDisabled: boolean; 
    useMasking: boolean;
    onPhoneClick: () => void;
    onSmsClick: () => void;
    onChange: (newValue: string) => void;
}

export const ConsentBasedPhoneSmsComponent = (props: IPhoneSmsProps) => {
    const styles = useStyles();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const cursorRef = React.useRef<number | null>(null);
    
    const [isHoveringPhone, setIsHoveringPhone] = React.useState(false);
    const [isHoveringSms, setIsHoveringSms] = React.useState(false);

    // Restore cursor position after formatting
    React.useLayoutEffect(() => {
        if (inputRef.current && cursorRef.current !== null) {
            inputRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
            cursorRef.current = null;
        }
    });

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { value: string }) => {
    const inputElement = ev.target as HTMLInputElement;
    const selectionStart = inputElement.selectionStart || 0;
    const oldValue = props.phoneNumber;
    const newValue = data.value;
        if (props.useMasking) {
            const formatted = new AsYouType().input(newValue);
            const diff = formatted.length - newValue.length;
            cursorRef.current = selectionStart + diff;            
            props.onChange(formatted);
        } 
        else {
            cursorRef.current = selectionStart;
            props.onChange(newValue);
        }
    };

    return (
        <FluentProvider theme={webLightTheme} style={{ background: 'transparent', width: '100%' }}>
            <div className={styles.container}>
                <Input 
                    input={{ ref: inputRef }}
                    value={props.phoneNumber} 
                    disabled={props.isDisabled}
                    onChange={handleChange}
                    className={styles.input}
                    appearance="filled-lighter" 
                    placeholder={props.placeholder}
                />
                
                {!props.hidePhone && props.phoneNumber && (
                    <Button 
                        className={styles.actionButton}
                        // Both icons now strictly size 20
                        icon={isHoveringPhone ? <Call20Filled /> : <Call20Regular />} 
                        onMouseEnter={() => setIsHoveringPhone(true)}
                        onMouseLeave={() => setIsHoveringPhone(false)}
                        onClick={props.onPhoneClick}
                        title="Call"
                        disabled={props.isDisabled}
                    />
                )}
                
                {!props.hideSMS && props.phoneNumber && (
                    <Button 
                        className={styles.actionButton}
                        // Both icons now strictly size 20
                        icon={isHoveringSms ? <Chat20Filled /> : <Chat20Regular />} 
                        onMouseEnter={() => setIsHoveringSms(true)}
                        onMouseLeave={() => setIsHoveringSms(false)}
                        onClick={props.onSmsClick}
                        title="SMS"
                        disabled={props.isDisabled}
                    />
                )}
            </div>
        </FluentProvider>
    );
};