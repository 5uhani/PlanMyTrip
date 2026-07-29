import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle, Compass } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/Button.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    // Simulate network submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent to the PlanMyTrip support team.");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
          We Are Here To Help
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-poppins">
          Get In Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Have questions about travel destinations, API integrations, or feature feedback? Send our team a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 5 Cols: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-teal-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-bold font-poppins">Contact Information</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach out to us via email or visit our community channels. We respond within 24 business hours.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-700/80 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email Support</p>
                  <p className="font-semibold text-white">support@planmytrip.io</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone & Helpline</p>
                  <p className="font-semibold text-white">+1 (800) 555-TRIP (8747)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Headquarters</p>
                  <p className="font-semibold text-white">San Francisco, CA & Global Remote</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-start gap-4">
            <Compass className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-100 block mb-0.5">Need instant itinerary help?</strong>
              Try our AI Trip Planner to automatically generate custom schedules and budget estimates right now.
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-teal-600 dark:text-teal-400 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Message Sent Successfully!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Thank you for reaching out, <strong>{formData.name}</strong>. A support specialist will review your inquiry regarding "{formData.subject}" shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Send Us a Message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Explorer"
                    className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject / Category</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Itinerary Help">Itinerary & Trip Planner Help</option>
                  <option value="API or Weather Issue">API or Weather Integration Issue</option>
                  <option value="Feature Request">Feature Request / Suggestion</option>
                  <option value="Partnership">Business Partnership</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Message *</label>
                <textarea
                  rows="4"
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist you with your travel planning today?..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                className="w-full py-4 shadow-lg"
                icon={Send}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
