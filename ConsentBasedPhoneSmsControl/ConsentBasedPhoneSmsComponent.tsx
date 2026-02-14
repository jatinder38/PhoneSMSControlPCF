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

export interface ICallSmsProps {
    phoneNumber: string;
    placeholder: string;
    hidePhone: boolean; 
    hideSMS: boolean;   
    isDisabled: boolean; 
    useFormatting: boolean;
    onPhoneClick: () => void;
    onSmsClick: () => void;
    onChange: (newValue: string) => void;
}

export const ConsentBasedPhoneSmsComponent = (props: ICallSmsProps) => {
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(props.phoneNumber || "");
    const [isHoveringPhone, setIsHoveringPhone] = React.useState(false);
    const [isHoveringSms, setIsHoveringSms] = React.useState(false);

    React.useEffect(() => {
        setLocalValue(props.phoneNumber);
    }, [props.phoneNumber]);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { value: string }) => {
        setLocalValue(data.value);
        props.onChange(data.value);
    };

    const handleBlur = () => {
        if (props.useFormatting && localValue) {
            const formatted = new AsYouType().input(localValue);
            setLocalValue(formatted);
            props.onChange(formatted);
        }
    };

    return (
        <FluentProvider theme={webLightTheme} style={{ background: 'transparent', width: '100%' }}>
            <div className={styles.container}>
                <Input 
                    value={localValue} 
                    disabled={props.isDisabled}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    className={styles.input}
                    appearance="filled-lighter" 
                    placeholder={props.placeholder}
                    type="tel"
                />
                
                {!props.hidePhone && localValue && (
                    <Button 
                        className={styles.actionButton}
                        icon={isHoveringPhone ? <Call20Filled /> : <Call20Regular />} 
                        onMouseEnter={() => setIsHoveringPhone(true)}
                        onMouseLeave={() => setIsHoveringPhone(false)}
                        onClick={props.onPhoneClick}
                        title="Call"
                        disabled={props.isDisabled}
                    />
                )}
                
                {!props.hideSMS && localValue && (
                    <Button 
                        className={styles.actionButton}
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