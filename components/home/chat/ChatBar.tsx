"use client"
import useChatSession from "@/hooks/useChatSession";
import * as Tabs from '@radix-ui/react-tabs';

const ChatBar = () => {
    const { chatSession } = useChatSession(['beanchillin@gmail.com', 'admin@gmail.com']);
    return (
        <div className="sticky hidden md:block justify-start space-y-16 flex-col w-2/5 lg:w-1/4 mt-10 pt-12">
            <h1>Your Chat</h1>
            <Tabs.Root defaultValue="tab1" orientation="vertical">
                <Tabs.List aria-label="tabs example">
                    <Tabs.Trigger value="tab1">One</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">Two</Tabs.Trigger>
                    <Tabs.Trigger value="tab3">Three</Tabs.Trigger>
                </Tabs.List>
                <Tabs.List aria-label="tabs example">
                    <Tabs.Trigger value="tab1">One</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">Two</Tabs.Trigger>
                    <Tabs.Trigger value="tab3">Three</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">Tab one content</Tabs.Content>
                <Tabs.Content value="tab2">Tab two content</Tabs.Content>
                <Tabs.Content value="tab3">Tab three content</Tabs.Content>
            </Tabs.Root>
        </div>
    );
};

export default ChatBar;
