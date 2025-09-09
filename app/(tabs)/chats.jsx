import { ArrowLeft, Car, CreditCard, Phone, Plus, Send, UtensilsCrossed } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen({ onNavigate }) {
  const [messages, setMessages] = useState([
    { id: '1', type: 'bot', content: 'Hello Rahul! How can I help you today?', timestamp: new Date(Date.now() - 300000) },
    { id: '2', type: 'user', content: 'I need to book a ride', timestamp: new Date(Date.now() - 240000) },
    {
      id: '3',
      type: 'service',
      content: 'I can help you book a ride. Where would you like to go?',
      timestamp: new Date(Date.now() - 180000),
      serviceAction: { type: 'ride', label: 'Book Ride', action: () => onNavigate('ride') },
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const scrollRef = useRef();

  const smartReplies = [
    { text: 'Book a ride', action: () => onNavigate('ride') },
    { text: 'Order food', action: () => onNavigate('food') },
    { text: 'Recharge mobile', action: () => onNavigate('payments') },
    { text: 'Pay bills', action: () => onNavigate('payments') },
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = { id: Date.now().toString(), type: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', content: 'I understand you need help with that.', timestamp: new Date() }]);
    }, 1000);
  };

  const formatTime = date => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('home')}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Support Chat</Text>
          <Text style={styles.headerSub}>Online • Typically replies instantly</Text>
        </View>
        <TouchableOpacity>
          <Phone size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 12 }}
      >
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.type === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <View style={[styles.messageBubble, msg.type === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.messageText, msg.type === 'user' && { color: '#fff' }]}>{msg.content}</Text>
              {msg.serviceAction && (
                <TouchableOpacity style={styles.serviceButton} onPress={msg.serviceAction.action}>
                  <Text style={styles.serviceButtonText}>{msg.serviceAction.label}</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Smart Replies */}
      <ScrollView
        horizontal
        style={styles.smartReplies}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {smartReplies.map((reply, index) => (
          <TouchableOpacity key={index} style={styles.smartReplyButton} onPress={reply.action}>
            <Text style={styles.smartReplyText}>{reply.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.plusButton}>
          <Plus size={20} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickButtons}>
          <TouchableOpacity style={styles.quickButton} onPress={() => onNavigate('ride')}>
            <Car size={16} color="#000" />
            <Text style={styles.quickButtonText}>Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => onNavigate('food')}>
            <UtensilsCrossed size={16} color="#000" />
            <Text style={styles.quickButtonText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => onNavigate('payments')}>
            <CreditCard size={16} color="#000" />
            <Text style={styles.quickButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', elevation: 2 },
  headerTextContainer: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerSub: { fontSize: 12, color: '#888', marginTop: 2 },
  messages: { flex: 1 },
  messageContainer: { marginVertical: 4 },
  messageBubble: { borderRadius: 12, padding: 10, maxWidth: '75%' },
  userMessage: { alignItems: 'flex-end' },
  botMessage: { alignItems: 'flex-start' },
  userBubble: { backgroundColor: '#3B82F6' },
  botBubble: { backgroundColor: '#e2e2e2' },
  messageText: { fontSize: 14 },
  serviceButton: { marginTop: 6, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#2563EB', borderRadius: 6, alignSelf: 'flex-start' },
  serviceButtonText: { color: '#fff', fontSize: 12 },
  timestamp: { fontSize: 10, color: '#aaa', marginTop: 2 },
  smartReplies: { maxHeight: 45, marginVertical: 6 },
  smartReplyButton: { backgroundColor: '#ddd', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, marginRight: 6 },
  smartReplyText: { fontSize: 13, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#e0e0e0' },
  plusButton: { padding: 6 },
  input: { flex: 1, borderRadius: 20, backgroundColor: '#f0f0f0', paddingHorizontal: 14, height: 42 },
  sendButton: { padding: 10, backgroundColor: '#3B82F6', borderRadius: 20, marginLeft: 6 },
  quickActions: { padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#e0e0e0' },
  quickActionsTitle: { fontWeight: 'bold', marginBottom: 8 },
  quickButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  quickButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, borderColor: '#ccc' },
  quickButtonText: { fontSize: 14 },
});
