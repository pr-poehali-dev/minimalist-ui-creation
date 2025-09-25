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

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  count?: number;
  files?: FileItem[];
}

interface Student {
  id: number;
  name: string;
  uploadedFiles: string[];
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
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const fileStructure: FileItem[] = [
    {
      name: 'Лекции',
      type: 'folder',
      count: 20,
      files: Array.from({ length: 20 }, (_, i) => ({
        name: `Лекция ${i + 1}.pdf`,
        type: 'file'
      }))
    },
    {
      name: 'Математика',
      type: 'folder',
      count: 13,
      files: Array.from({ length: 13 }, (_, i) => ({
        name: `Математика_${i + 1}.pdf`,
        type: 'file'
      }))
    },
    {
      name: 'Физика',
      type: 'folder',
      count: 8,
      files: Array.from({ length: 8 }, (_, i) => ({
        name: `Физика_лекция_${i + 1}.pdf`,
        type: 'file'
      }))
    },
    {
      name: 'Информатика',
      type: 'folder',
      count: 15,
      files: Array.from({ length: 15 }, (_, i) => ({
        name: `Информатика_${i + 1}.pdf`,
        type: 'file'
      }))
    },
    {
      name: 'История',
      type: 'folder',
      count: 6,
      files: Array.from({ length: 6 }, (_, i) => ({
        name: `История_тема_${i + 1}.pdf`,
        type: 'file'
      }))
    }
  ];

  const groups = [
    {
      id: 1,
      name: '151',
      students: [
        {
          id: 1,
          name: 'Петров Сергей Александрович',
          uploadedFiles: ['Лабораторная работа №1.docx', 'Курсовой проект.pdf']
        },
        {
          id: 2,
          name: 'Сидорова Анна Владимировна',
          uploadedFiles: ['Реферат по физике.pdf', 'Практическая работа №3.docx']
        },
        {
          id: 3,
          name: 'Козлов Дмитрий Игоревич',
          uploadedFiles: ['Лабораторная работа №2.docx']
        },
        {
          id: 4,
          name: 'Морозова Екатерина Сергеевна',
          uploadedFiles: ['Курсовая работа.pdf', 'Отчет по практике.docx']
        }
      ]
    },
    {
      id: 2,
      name: '152',
      students: [
        {
          id: 5,
          name: 'Волков Алексей Николаевич',
          uploadedFiles: ['Лабораторная работа №3.docx', 'Реферат по истории.pdf']
        },
        {
          id: 6,
          name: 'Новикова Ольга Петровна',
          uploadedFiles: ['Курсовая работа.docx']
        },
        {
          id: 7,
          name: 'Смирнов Антон Владимирович',
          uploadedFiles: ['Лабораторная работа №1.pdf', 'Презентация.pptx']
        }
      ]
    },
    {
      id: 3,
      name: '153',
      students: [
        {
          id: 8,
          name: 'Лебедев Максим Сергеевич',
          uploadedFiles: ['Дипломная работа.pdf']
        },
        {
          id: 9,
          name: 'Карпова Мария Александровна',
          uploadedFiles: ['Реферат.pdf', 'Лабораторная работа №2.docx', 'Отчет.pdf']
        }
      ]
    }
  ];

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

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* White Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-black text-primary tracking-tight px-[58px] py-0 my-0">
              ТУСУР
            </h1>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="/img/f664e02c-e2b8-4cc0-a29e-6fb48bf50940.jpg" 
                alt="2Archive Logo" 
                className="w-24 h-16 rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-foreground">Иванов Иван Иванович</p>
              <p className="text-sm text-muted-foreground">Группа 151</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        
        <div className="relative z-10">
          {/* Content */}
          <div className="container mx-auto px-6 py-8">

          {/* Navigation */}
          <div className="flex justify-center mb-16 mx-12 px-[41px]">
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
              <div className="max-w-4xl mx-auto">
                <div className="text-center my-3.5">
                  <Icon name="FileText" size={48} className="mx-auto mb-4 text-accent" />
                  <h2 className="text-2xl font-bold mb-4 text-white">Файлы</h2>
                  <p className="text-white/80 text-lg">Поиск </p>
                </div>
                
                {/* Upload Zone */}
                <Card className="bg-white/10 backdrop-blur border-white/20 border-dashed border-2 mb-6">
                  <div className="p-8 text-center px-2 py-1">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-accent" />
                    <h3 className="text-lg font-semibold text-white mb-2">Загрузите или перетащите файл для добавления</h3>
                    <p className="text-white/70 text-sm">Поддерживаемые форматы: PDF, DOCX, PPTX, TXT</p>
                    <Button className="mt-4 bg-accent hover:bg-accent/80 text-accent-foreground">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Выбрать файл
                    </Button>
                  </div>
                </Card>

                <div className="grid gap-4">
                  {fileStructure.map((item) => (
                    <Card key={item.name} className="bg-white/10 backdrop-blur border-white/20">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 transition-all px-4 py-2.5"
                        onClick={() => toggleFolder(item.name)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            name={openFolders.includes(item.name) ? "FolderOpen" : "Folder"} 
                            size={24} 
                            className="text-accent" 
                          />
                          <span className="font-medium text-white">{item.name}</span>
                          <Badge className="bg-white/20 text-white">
                            {item.count} файлов
                          </Badge>
                        </div>
                        <Icon 
                          name={openFolders.includes(item.name) ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-white/60" 
                        />
                      </div>
                      
                      {openFolders.includes(item.name) && item.files && (
                        <div className="border-t border-white/20 bg-white/5">
                          <div className="max-h-48 overflow-y-auto">
                            {item.files.map((file, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/10 transition-all">
                                <Icon name="FileText" size={16} className="text-white/60" />
                                <span className="text-sm text-white/80">{file.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'group' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <Icon name="Users" size={48} className="mx-auto mb-4 text-accent" />
                  <h2 className="text-2xl font-bold mb-4 text-white">Группа 151</h2>
                  <p className="text-white/80">Студенты и их загруженные файлы</p>
                  <Badge className="mt-4 bg-destructive">2 новых сообщения</Badge>
                </div>
                
                <div className="space-y-6">
                  {groups.map((group) => (
                    <div key={group.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon name="Users" size={24} className="text-accent" />
                        <h3 className="text-xl font-bold text-white">Группа 151</h3>
                        <Badge className="bg-accent/20 text-accent">14 студентов</Badge>
                      </div>
                      
                      <div className="grid gap-4">
                        {group.students.map((student) => (
                          <Card key={student.id} className="bg-white/10 backdrop-blur border-white/20 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                  <Icon name="User" size={20} className="text-accent" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white">{student.name}</h4>
                                  <p className="text-sm text-white/60">Группа {group.name}</p>
                                </div>
                              </div>
                              <Badge className="bg-white/20 text-white">
                                {student.uploadedFiles.length} файлов
                              </Badge>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium text-white/80 mb-2">Загруженные файлы:</h5>
                              <div className="space-y-2">
                                {student.uploadedFiles.map((file, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 rounded bg-white/5">
                                    <Icon name="FileText" size={14} className="text-white/60" />
                                    <span className="text-xs text-white/70">{file}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
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

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-primary mb-3">Поддержка</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  <Icon name="Phone" size={14} className="inline mr-2" />
                  +7 (800) 555-20-24
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <Icon name="Mail" size={14} className="inline mr-2" />
                  2Archive@mail.ru
                </p>
                
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <p className="font-semibold mb-2">Федеральное государственное автономное образовательное учреждение высшего образования «Томский Государственный университет систем управления и радиоэлектроники»</p>
                  
                  <div className="space-y-1 mb-3">
                    <p className="flex items-center">
                      <Icon name="MapPin" size={12} className="mr-2" />
                      634050, г.Томск, пр. Ленина, 40
                    </p>
                    <p className="flex items-center">
                      <Icon name="Phone" size={12} className="mr-2" />
                      (3822) 51-05-30
                    </p>
                    <p className="flex items-center">
                      <Icon name="Printer" size={12} className="mr-2" />
                      (3822) 51-32-62
                    </p>
                    <p className="flex items-center">
                      <Icon name="Mail" size={12} className="mr-2" />
                      office@tusur.ru
                    </p>
                    <p className="flex items-center">
                      <Icon name="Clock" size={12} className="mr-2" />
                      пн. - пт., 8:30 - 17:30, обед 13:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-primary mb-3">QR-код для быстрого доступа</h3>
                <div className="inline-block w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                  <Icon name="QrCode" size={32} className="text-gray-400" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Сканируйте для входа</p>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground">Образовательная платформа ТУСУР</p>
              </div>
            </div>
            
            {/* Copyright notice */}
            <div className="border-t border-gray-200 mt-6 pt-4">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                При полном или частичном использовании текстовых или графических материалов с сайта Edu.tusur.ru или с сайта 2ArchiveTusur.ru активная ссылка на сайт ТУСУРа и на сайт 2Archive обязательна.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;