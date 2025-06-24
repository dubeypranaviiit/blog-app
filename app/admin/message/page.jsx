'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/api/contact');
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      setSelectedMsg(null);
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedMsg(msg)}
              className="cursor-pointer p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
            >
              <p className="font-semibold">{msg.fullName}</p>
              <p className="text-sm text-gray-600 truncate">
                {msg.message.length > 50 ? msg.message.slice(0, 50) + '...' : msg.message}
              </p>
            </div>
          ))}
        </div>
      )}

     
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-xl">
            <button
              onClick={() => setSelectedMsg(null)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-2">Message Details</h2>
            <p><strong>Full Name:</strong> {selectedMsg.fullName}</p>
            <p><strong>Email:</strong> {selectedMsg.email}</p>
            <p><strong>Phone:</strong> {selectedMsg.phone}</p>
            <p><strong>Message:</strong></p>
            <p className="whitespace-pre-line bg-gray-100 p-2 rounded">{selectedMsg.message}</p>
            <p className="text-sm text-gray-500 mt-3">
              Sent at: {new Date(selectedMsg.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <a
                href={`mailto:${selectedMsg.email}?subject=Re: Your message&body=Hi ${selectedMsg.fullName},%0D%0A%0D%0A`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Reply
              </a>
              <button
                onClick={() => handleDelete(selectedMsg._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
