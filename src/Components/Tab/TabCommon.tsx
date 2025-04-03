import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface TabCommonProps {
    tabs: Array<{ id: string, description: string, children: ReactNode }>
    tabIdDefault?: string 
    value?: string   
    setValue?: Dispatch<SetStateAction<string>>
}

export default function TabCommon({ 
    tabs, 
    tabIdDefault = '',
    value,
    setValue    
} : TabCommonProps) {
    const [valueInternal, setValueInternal] = useState(tabIdDefault);

    function GetValueIntercept(): string {
      return value ? value : valueInternal
    }

    function setValueIntercept(value: string) {
      setValue ? setValue(value) : setValueInternal(value)
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {    
        setValueIntercept(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', height: '100%' }}>
            <TabContext value={GetValueIntercept()}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', // Centraliza as Tabs
                            width: '100%',             // Garante que as Tabs ocupem 100% da largura
                        }}
                        onChange={handleChange}>
                        {tabs.map((item, i) => {                            
                            return <Tab 
                                        key={i}
                                        sx={{ flex: 1, textAlign: 'center' }}
                                        label={item.description} value={item.id} />
                        })}                                                
                    </TabList>
                </Box>
                
                {tabs.map((item, i) => {
                    return <TabPanel key={i} value={item.id}>{item.children}</TabPanel>
                })}      
            </TabContext>
        </Box>
    )
}