import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я твой умный помощник ТУСУР. Задай мне любой вопрос об учебе, расписании или университете!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'files', label: 'Файлы', icon: 'FileText' },
    { id: 'group', label: 'Группа', icon: 'Users', hasNotification: true, notificationCount: 2 }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    const botResponses = [
      'Отличный вопрос! Я помогу тебе с этим.',
      'По расписанию: лекции проходят в корпусе А, аудитория 204.',
      'Для сдачи лабораторных работ обращайся к преподавателю до 18:00.',
      'Экзамены начинаются 15 января. Не забудь подготовиться!',
      'Студенческий билет можно восстановить в деканате, кабинет 105.'
    ];

    const botMessage: Message = {
      id: Date.now() + 1,
      text: botResponses[Math.floor(Math.random() * botResponses.length)],
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
              ТУСУР
            </h1>
            <p className="text-xl text-white/80 font-light">
              Образовательная платформа с ИИ-помощником
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
              <div className="flex gap-2">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-white text-primary shadow-lg'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon name={item.icon as any} size={20} />
                    <span className="font-medium">{item.label}</span>
                    {item.hasNotification && (
                      <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {item.notificationCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'home' && (
              <div className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card className="p-6 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                    <Icon name="BookOpen" size={32} className="mx-auto mb-4 text-accent" />
                    <h3 className="text-lg font-semibold mb-2">Лекции</h3>
                    <p className="text-white/80">Доступ к записям лекций и материалам</p>
                  </Card>
                  <Card className="p-6 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                    <Icon name="Calendar" size={32} className="mx-auto mb-4 text-accent" />
                    <h3 className="text-lg font-semibold mb-2">Расписание</h3>
                    <p className="text-white/80">Актуальное расписание занятий</p>
                  </Card>
                  <Card className="p-6 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                    <Icon name="Award" size={32} className="mx-auto mb-4 text-accent" />
                    <h3 className="text-lg font-semibold mb-2">Оценки</h3>
                    <p className="text-white/80">Текущие оценки и рейтинг</p>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="text-center text-white">
                <Icon name="FileText" size={48} className="mx-auto mb-4 text-accent" />
                <h2 className="text-2xl font-bold mb-4">Файлы</h2>
                <p className="text-white/80">Здесь будут размещены учебные материалы</p>
              </div>
            )}

            {activeTab === 'group' && (
              <div className="text-center text-white">
                <Icon name="Users" size={48} className="mx-auto mb-4 text-accent" />
                <h2 className="text-2xl font-bold mb-4">Группа</h2>
                <p className="text-white/80">Общение с одногруппниками</p>
                <Badge className="mt-4 bg-destructive">2 новых сообщения</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
            onClick={() => setShowChat(false)}
          >
            <Icon name="HelpCircle" size={24} />
          </Button>
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-accent/90 hover:bg-accent text-accent-foreground transition-all duration-300 shadow-lg"
            onClick={() => setShowChat(!showChat)}
          >
            <Icon name="Bot" size={24} />
          </Button>
        </div>

        {/* Chat Window */}
        {showChat && (
          <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-white/20 backdrop-blur-lg overflow-hidden animate-scale-in">
            <div className="bg-primary text-primary-foreground p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Bot" size={20} />
                  <h3 className="font-semibold">Умный помощник ТУСУР</h3>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowChat(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4 h-64">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Задайте вопрос..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;