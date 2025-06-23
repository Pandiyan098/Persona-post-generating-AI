import React, { useState } from 'react';
import AreaOfInterest from '../components/AreaOfInterest';
import { FiCpu, FiImage, FiHeart, FiMusic, FiCamera, FiFeather, FiUpload, FiEdit2, FiX, FiDownload } from 'react-icons/fi';
import { GiCook, GiGamepad, GiRunningShoe,GiLipstick ,GiSewingNeedle} from 'react-icons/gi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin,FaGoogle, FaEnvelope, FaSnapchatGhost, FaTwitter, FaTelegram, FaPinterest } from 'react-icons/fa';
import { FaTree } from "react-icons/fa";
import '../styles/interests.css';
import Navbar from '../components/Navbar';
import SixHandSpinner from '../components/Spinner';
import {WelcomeMessage }from '../components/Welcome';

const AreasOfInterest: React.FC = () => {
 const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
 const [prompt, setPrompt] = useState('');
 const [generatedImage, setGeneratedImage] = useState<string | null>(null);
 const [generatedContent, setGeneratedContent] = useState('');
 const [isGenerating, setIsGenerating] = useState(false);
 const [showShareOptions, setShowShareOptions] = useState(false);
 

 const handleSelect = (title: string, isSelected: boolean) => {
 if (isSelected) {
 setSelectedInterests([...selectedInterests, title]);
 } else {
 setSelectedInterests(selectedInterests.filter(item => item !== title));
 }
 };

 const generatePost = async () => {
 if (!prompt.trim()) return;
 
 setIsGenerating(true);
 setGeneratedContent('');
 setGeneratedImage('');
 
 try {
 // 1. Enhance prompt for image generation
 const enhancedPrompt = `Generate a highly realistic, detailed photo of ${prompt}, incorporating elements of ${selectedInterests.join(', ')}. Focus on natural lighting, lifelike textures, and authentic scenery.`;

 
 // 2. Call Image Generation API
 const imageResponse = await fetch('http://localhost:5000/api/images/generate', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ prompt: enhancedPrompt }),
 });
 
 const imageData = await imageResponse.json();
 
 if (imageData.success && imageData.data?.imageUrl) {
 setGeneratedImage(`http://localhost:5000${imageData.data.imageUrl}`);
 } else {
 console.error('Image generation failed:', imageData);
 setGeneratedContent('❌ Failed to generate image.');
 setIsGenerating(false);
 return;
 }
 
 // 3. Prepare topic for Hashtag API
 const topicString = `${prompt}, ${selectedInterests.join(', ')}`;
 
 // 4. Call Hashtag/Caption Generation API
 const hashtagResponse = await fetch('http://localhost:5000/api/hashtags/generate', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ topic: topicString }),
 });
 
 const hashtagData = await hashtagResponse.json();
 
 if (hashtagData.success) {
 const { caption, hashtags } = hashtagData.data;
 const hashtagText = hashtags.join(' ');
 setGeneratedContent(`${caption}\n\n${hashtagText}`);
 } else {
 console.error('Hashtag generation failed:', hashtagData);
 setGeneratedContent('✅ Image generated but failed to generate caption and hashtags.');
 }
 } catch (error) {
 console.error('Generation error:', error);
 setGeneratedContent('Something went wrong while generating content.');
 } finally {
 setIsGenerating(false);
 }
 };
 
 
 

 const handleDownload = async () => {
 if (!generatedImage) return;
 
 try {
 const response = await fetch(generatedImage);
 const blob = await response.blob();
 const url = window.URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = 'ai-generated-image.png';
 document.body.appendChild(a);
 a.click();
 window.URL.revokeObjectURL(url);
 document.body.removeChild(a);
 } catch (error) {
 console.error('Download failed:', error);
 }
 };

 const handleNativeShare = async (blob: Blob) => {
 if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'image.png', { type: blob.type })] })) {
 try {
 const file = new File([blob], 'ai-image.png', { type: blob.type });
 await navigator.share({
 files: [file],
 title: 'AI Generated Image',
 text: prompt,
 });
 return true;
 } catch (error) {
 console.log('Native share cancelled:', error);
 return false;
 }
 }
 return false;
 };

 const handleShare = async (platform: string) => {
 if (!generatedImage) return;

 try {
 const response = await fetch(generatedImage);
 const blob = await response.blob();

 // Try native sharing first (works on mobile)
 const nativeShared = await handleNativeShare(blob);
 if (nativeShared) {
 setShowShareOptions(false);
 return;
 }

 // Combine caption and hashtags for sharing (remove prompt from shareText)
 const shareText = generatedContent;
 const imageUrl = generatedImage;

 switch (platform) {
 case 'facebook':
 window.open(
 `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&quote=${encodeURIComponent(shareText)}`,
 '_blank'
 );
 break;

 case 'twitter':
 window.open(
 `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(imageUrl)}`,
 '_blank'
 );
 break;

 case 'pinterest':
 window.open(
 `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(imageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareText)}`,
 '_blank'
 );
 break;

 case 'whatsapp':
 window.open(
 `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + imageUrl)}`,
 '_blank'
 );
 break;

 case 'instagram':
 if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
 window.open(`instagram://library?AssetPath=${encodeURIComponent(imageUrl)}`, '_blank');
 setTimeout(() => {
 window.open('https://www.instagram.com/', '_blank');
 }, 500);
 } else {
 window.open('https://www.instagram.com/', '_blank');
 }
 break;

 case 'linkedin':
 window.open(
 `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}&summary=${encodeURIComponent(shareText)}`,
 '_blank'
 );
 break;

 case 'telegram':
 window.open(
 `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(shareText)}`,
 '_blank'
 );
 break;

 case 'email': {
 const mailtoLink = `mailto:?subject=AI Generated Content&body=${encodeURIComponent(shareText + '\n\n' + imageUrl)}`;
 window.open(mailtoLink, '_blank');
 break;
 }

 case 'gmail': {
 const subject = 'Check out this AI-generated content';
 const body = `${shareText}\n\nView the image here: ${generatedImage}\n\n${imageUrl}`;
 window.open(
 `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
 '_blank'
 );
 break;
 }

 case 'snapchat':
 window.open(
 `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(imageUrl)}`,
 '_blank'
 );
 break;

 default:
 window.open(imageUrl, '_blank');
 }
 } catch (error) {
 console.error('Sharing failed:', error);
 alert('Sharing failed. Please download the image and share manually.');
 }

 setShowShareOptions(false);
 };

 return (
 <>
 <Navbar />
 <div className="min-h-screen bg-[rgb(200,203,254)] py-8 px-4">
 
 <div className="prompt-page-container">
 {/* Prompt Section */}
 
 <div className="prompt-section bg-white rounded-xl p-6 mb-8 shadow-lg">
 <h2 className="generate-page-header text-xl font-bold mb-4 text-[var(--primary-purple)]">Create AI Content</h2>

 {
 !generatedImage && (
 <>
 <WelcomeMessage/>
 </>
 )
 }
 {selectedInterests.length > 0 && (
 <div className="prompt-subtext mb-4 p-3 bg-[var(--ube-50)] rounded-lg border border-[var(--ube-100)]">
 <p className="text-sm text-[var(--text--secondary)]">
 <span className="prompt-text font-medium">Selected interests:</span> {selectedInterests.join(', ')}
 </p>
 </div>
 )}
 
 <div className="prompt-input-container mb-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
 
 <div className="flex pen items-center gap-2 mb-2" style={{ alignItems: 'center' }}>
 <FiEdit2 className="text-[var(--text--tertiary)]" />
 <label className="text-sm font-medium">Add Your Prompt</label>
 </div>
 <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
 <textarea
 value={prompt}
 onChange={(e) => setPrompt(e.target.value)}
 placeholder="Describe what you want to create (e.g., 'An infographic about AI trends')"
 className="w-full p-3 border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--ube-300)] focus:border-transparent"
 rows={3}
 />
 </div>
 </div>

 <button
 onClick={generatePost}
 disabled={!prompt.trim() || isGenerating}
 className="generate-btn w-full flex items-center justify-center gap-2 bg-[var(--ube-600)] text-white py-2 px-4 rounded-lg hover:bg-[var(--ube-800)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isGenerating ? (
 'Generating...'
 ) : (
 <>
 <FiImage /> Generate Post
 </>
 )}
 </button>
 

 {isGenerating && !generatedImage && (
 <div className="flex items-center justify-center">
 <SixHandSpinner />
 </div>
 )}
 
 {!isGenerating && generatedImage && (
 <div className="generated-content mt-6">
 <div className="image-caption-container">
 <div className="generated-image-container mb-4">
 <img 
 src={generatedImage} 
 alt="Generated content" 
 className="w-full h-auto rounded-lg object-cover border border-[var(--border-primary)]"
 />
 </div>
 <div className="generated-text bg-[var(--ube-50)] p-4 rounded-lg">
 <p className="text-sm text-[var(--text--secondary)]">{generatedContent}</p>
 </div>
 </div>
 
 
 
 
 <div className="buttons-container gap-4 mt-4">
 <button 
 onClick={handleDownload}
 className="download-btn flex items-center justify-center gap-2 bg-[var(--ube-400)] text-white py-2 px-4 rounded-lg hover:bg-[var(--ube-500)] transition-colors"
 >
 <FiDownload /> Download
 </button>
 
 <button 
 onClick={() => setShowShareOptions(true)}
 className="share-btn flex items-center justify-center gap-2 bg-[var(--ube-600)] text-white py-2 px-4 rounded-lg hover:bg-[var(--ube-800)] transition-colors"
 >
 <FiUpload /> Share
 </button>
 </div>
 
 

 {showShareOptions && (
 <div className="share-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
 <div className="share-modal-content bg-white rounded-lg p-6 w-full max-w-md">
 <div className="modal-header flex justify-between items-center mb-4">
 <h3 className="modal-title text-xl font-bold text-[var(--primary-purple)]">Share Post</h3>
 <button 
 onClick={() => setShowShareOptions(false)}
 className="close-modal-btn text-gray-500 hover:text-gray-700"
 >
 <FiX size={24} />
 </button>
 </div>
 <div className="social-icons-container grid grid-cols-3 gap-4">
 <button 
 onClick={() => handleShare('facebook')}
 className="social-icon-btn facebook flex flex-col items-center p-3 rounded-lg hover:bg-blue-50"
 >
 <FaFacebook className="social-icon text-blue-600 text-2xl" />
 <span className="social-label mt-2 text-sm">Facebook</span>
 </button>
 <button 
 onClick={() => handleShare('twitter')}
 className="social-icon-btn twitter flex flex-col items-center p-3 rounded-lg hover:bg-blue-50"
 >
 <FaTwitter className="social-icon text-blue-400 text-2xl" />
 <span className="social-label mt-2 text-sm">Twitter</span>
 </button>
 <button 
 onClick={() => handleShare('instagram')}
 className="social-icon-btn instagram flex flex-col items-center p-3 rounded-lg hover:bg-pink-50"
 >
 <FaInstagram className="social-icon text-pink-600 text-2xl" />
 <span className="social-label mt-2 text-sm">Instagram</span>
 </button>
 <button 
 onClick={() => handleShare('whatsapp')}
 className="social-icon-btn whatsapp flex flex-col items-center p-3 rounded-lg hover:bg-green-50"
 >
 <FaWhatsapp className="social-icon text-green-500 text-2xl" />
 <span className="social-label mt-2 text-sm">WhatsApp</span>
 </button>
 <button 
 onClick={() => handleShare('linkedin')}
 className="social-icon-btn linkedin flex flex-col items-center p-3 rounded-lg hover:bg-blue-50"
 >
 <FaLinkedin className="social-icon text-blue-700 text-2xl" />
 <span className="social-label mt-2 text-sm">LinkedIn</span>
 </button>
 <button 
 onClick={() => handleShare('pinterest')}
 className="social-icon-btn pinterest flex flex-col items-center p-3 rounded-lg hover:bg-red-50"
 >
 <FaPinterest className="social-icon text-red-600 text-2xl" />
 <span className="social-label mt-2 text-sm">Pinterest</span>
 </button>
 <button 
 onClick={() => handleShare('telegram')}
 className="social-icon-btn telegram flex flex-col items-center p-3 rounded-lg hover:bg-blue-50"
 >
 <FaTelegram className="social-icon text-blue-500 text-2xl" />
 <span className="social-label mt-2 text-sm">Telegram</span>
 </button>
 <button 
 onClick={() => handleShare('snapchat')}
 className="social-icon-btn snapchat flex flex-col items-center p-3 rounded-lg hover:bg-yellow-50"
 >
 <FaSnapchatGhost className="social-icon text-yellow-500 text-2xl" />
 <span className="social-label mt-2 text-sm">Snapchat</span>
 </button>
 <button 
 onClick={() => handleShare('email')}
 className="social-icon-btn email flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
 >
 <FaEnvelope className="social-icon text-gray-600 text-2xl" />
 <span className="social-label mt-2 text-sm">Email</span>
 </button>
 <button 
 onClick={() => handleShare('gmail')}
 className="social-icon-btn gmail"
 >
 <FaGoogle className="social-icon" />
 <span className="social-label">Gmail</span>
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 )}
 </div>

 {/* Interests Section - Remains exactly the same */}
 <div className="bg-white rounded-xl p-6 shadow-lg" style={{ width: '100%', height: '100%' }}>
 <h1 className="text-2xl font-bold text-center mb-2 text-[var(--primary-purple)] area-of-interest-title">
 Select Your Areas of Interest
 </h1>
 <p className="text-center text-[var(--text--tertiary)] mb-6 area-of-interest-subtitle">
 Choose topics you're interested in to personalize your experience
 </p>

 <div className="area-of-interest-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 
 <AreaOfInterest
 title="Drawing & Painting"
 description="Develop artistic skills in various visual mediums"
 icon={<FiImage size={20} />}
 color="var(--ube-440)"
 onSelect={(selected) => handleSelect("Drawing & Painting", selected)}
 />
 <AreaOfInterest
 title="Cooking & Culinary Arts"
 description="Master cooking techniques and culinary creativity"
 icon={<GiCook size={20} />} 
 color="var(--mint-1000)"
 onSelect={(selected) => handleSelect("Cooking & Culinary Arts", selected)}
 />
 <AreaOfInterest
 title="Fitness & Wellness"
 description="Focus on physical health, workouts, and mental well-being"
 icon={<FiHeart size={20} />}
 color="var(--ube-600)"
 onSelect={(selected) => handleSelect("Fitness & Wellness", selected)}
 />
 <AreaOfInterest
 title="Music Production & Instruments"
 description="Create music and learn to play instruments"
 icon={<FiMusic size={20} />}
 color="var(--blueberry-500)"
 onSelect={(selected) => handleSelect("Music Production & Instruments", selected)}
 />
 <AreaOfInterest
 title="Photography & Videography"
 description="Capture moments and tell stories through visuals"
 icon={<FiCamera size={20} />}
 color="var(--purple-700)"
 onSelect={(selected) => handleSelect("Photography & Videography", selected)}
 />
 <AreaOfInterest
 title="Gaming & Game Development"
 description="Play and create interactive digital experiences"
 icon={<GiGamepad size={20} />} 
 color="var(--primary-purple)"
 onSelect={(selected) => handleSelect("Gaming & Game Development", selected)}
 />
 <AreaOfInterest
 title="Sports & Outdoor Activities"
 description="Engage in physical activities and adventure sports"
 icon={<GiRunningShoe size={20} />} 
 color="var(--ube-440)"
 onSelect={(selected) => handleSelect("Sports & Outdoor Activities", selected)}
 />
 <AreaOfInterest
 title="Writing & Storytelling"
 description="Express ideas through words and narrative techniques"
 icon={<FiFeather size={20} />}
 color="var(--mint-1000)"
 onSelect={(selected) => handleSelect("Writing & Storytelling", selected)}
 />
 <AreaOfInterest
 title="Sustainability & Environment"
 description="Learn about eco-friendly practices and conservation"
 icon={<FaTree size={20} />}
 color="var(--ube-1101)"
 onSelect={(selected) => handleSelect("Sustainability & Environment", selected)}
 />
 <AreaOfInterest
 title="Makeup & Beauty"
 description="Enhance looks and express creativity through makeup and beauty"
 icon={<GiLipstick size={20} />}
 color="var(--pink-500)"
 onSelect={(selected) => handleSelect("Makeup & Beauty", selected)}
 />

 <AreaOfInterest
 title="Clothing Design"
 description="Craft styles and set trends with your fashion creations"
 icon={<GiSewingNeedle size={20} />}
 color="var(--violet-600)"
 onSelect={(selected) => handleSelect("Clothing Design", selected)}
 />
 <AreaOfInterest
 title="Artificial Intelligence & Machine Learning"
 description="Explore AI algorithms, neural networks, and intelligent systems"
 icon={<FiCpu size={20} />}
 color="var(--primary-purple)"
 onSelect={(selected) => handleSelect("Artificial Intelligence & Machine Learning", selected)}
 />

 </div>
 </div>
 </div>
 </div>
 </>
 
 );
};

export default AreasOfInterest;