import { useState, useEffect } from "react";
import { Upload, X, Search, FileText, Check } from 'lucide-react';
import toast from "react-hot-toast";
import axios from '../api/axios.config';

export default function SubmitPaper() {
  // Form state - consolidated
  const [formData, setFormData] = useState({
    uploadedFile: null,
    title: '',
    topic: '',
    abstract: '',
    keywords: ''
  });
  
  // UI state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState({fullName:""},{email:""});
  
  // Author management state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [fetchedAuthors, setFetchedAuthors] = useState([]);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [finalQuery, setFinalQuery] = useState('');

  // TODO: Get current user from your auth context
  // const { currentUser } = useAuth();
  useEffect(()=>{
    const getCurrentUserId=async()=>{
      try{
        const response=await axios.get("/user/getCurrentUser",{withCredentials:true});
        setCurrentUserId(response.data.data._id);
        setCurrentUser(response.data.data);
      }catch(error){
        console.log(error);
      }
    }
      getCurrentUserId();
  },[]);

  // Update form data helper
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const searchUser = async () => {
      if (finalQuery.trim() === "") {
        setFetchedAuthors([]);
        return;
      }
      try {
        const response = await axios.post("/user/findByUserName", { userName: finalQuery });
        
        if (response.data.success) {
          const user = response.data.data;
          
          const formattedUser = [{
            id: user._id, 
            name: user.fullName, 
            email: user.email,
          }];
          
          const newAuthors = formattedUser.filter(
            (user) => !selectedAuthors.some((a) => a.id === user.id)
          );
          
          setFetchedAuthors(newAuthors);
        }            
      } catch (err) {
        setFetchedAuthors([]); 
        
    };
    
    if (finalQuery.trim() !== "") {
      searchUser();
    } else {
      setFetchedAuthors([]);
    }   
  }, [finalQuery, selectedAuthors]); 

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFinalQuery(searchQuery); 
      setShowAuthorDropdown(true);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type === 'application/pdf') {
      updateFormData('uploadedFile', file);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);
    } else {
      toast.error('Please upload a PDF file only.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addAuthor = (author) => {
    setSelectedAuthors([...selectedAuthors, author]);
    setSearchQuery('');
    setShowAuthorDropdown(false);
  };

  const removeAuthor = (authorId) => {
    setSelectedAuthors(selectedAuthors.filter(a => a.id !== authorId));
  };

  const removeFile = (e) => {
    e.stopPropagation();
    updateFormData('uploadedFile', null);
    setUploadProgress(0);
  };

  const isFormValid = () => {
    const abstractWordCount = formData.abstract.split(' ').filter(word => word).length;
    return (
      formData.uploadedFile &&
      uploadProgress === 100 &&
      formData.title.trim() !== '' &&
      formData.topic.trim() !== '' &&
      formData.abstract.trim() !== '' &&
      abstractWordCount <= 300
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all required fields correctly before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('paper', formData.uploadedFile);
      data.append('title', formData.title);
      data.append('topic', formData.topic);
      data.append('abstract', formData.abstract);
      data.append('keywords', formData.keywords || 'example,keywords');
      
      // Append current user ID as primary author
      data.append('authors', currentUserId);
      
      // Append all selected co-author IDs
      selectedAuthors.forEach(author => {
        data.append('authors', author.id);
      });
      console.log(data);

      const response = await axios.post('/paper/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form
        setFormData({
          uploadedFile: null,
          title: '',
          topic: '',
          abstract: '',
          keywords: ''
        });
        setUploadProgress(0);
        setSelectedAuthors([]);
        setSearchQuery('');
        setFinalQuery('');
      } else {
        toast.error(response.data.message || "Submission failed due to server error.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error(err.response?.data?.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const abstractWordCount = formData.abstract.split(' ').filter(word => word).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:ml-64 pt-16 lg:pt-10">
      <div className="max-w-4xl mx-auto">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#001F3F' }}>
            Upload Paper
          </h2>
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            
            {!formData.uploadedFile ? (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your PDF here or tap to upload
                </p>
                <p className="text-sm text-gray-500">PDF files only</p>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={removeFile}
                  className="absolute top-0 right-0 text-blue-700 hover:text-red-700 transition-colors bg-white rounded-full p-1 shadow-md"
                  title="Remove file"
                >
                  <X size={20} />
                </button>
                <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#001F3F' }} />
                <p className="font-semibold text-gray-700 mb-2">{formData.uploadedFile.name}</p>
                {uploadProgress < 100 ? (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${uploadProgress}%`,
                        backgroundColor: '#001F3F'
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check size={20} />
                    <span className="font-semibold">Upload Complete</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Author Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#001F3F' }}>
            Add Co-Authors
          </h2>
          
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search co-authors by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              onFocus={() => setShowAuthorDropdown(true)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {showAuthorDropdown && searchQuery && fetchedAuthors.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {fetchedAuthors.map(author => (
                  <div
                    key={author.id}
                    onClick={() => addAuthor(author)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-semibold text-gray-800">{author.name}</p>
                    <p className="text-sm text-gray-500">{author.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Authors List */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Authors List:</h3>
            <div className="space-y-2">
              {/* Current User (Cannot be removed) */}
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                <div>
                  <p className="font-semibold text-gray-800">{currentUser.fullName} (You)</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
                <span className="text-xs font-semibold text-blue-600">Primary Author</span>
              </div>

              {/* Selected Co-Authors */}
              {selectedAuthors.map(author => (
                <div
                  key={author.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{author.name}</p>
                    <p className="text-sm text-gray-500">{author.email}</p>
                  </div>
                  <button
                    onClick={() => removeAuthor(author.id)}
                    className="text-blue-900 hover:text-red-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Paper Details Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#001F3F' }}>
            Paper Details
          </h2>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="Enter paper title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.title === '' && (
                <p className="text-xs text-red-500 mt-1">Required field</p>
              )}
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => updateFormData('topic', e.target.value)}
                placeholder="Enter paper topic"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.topic === '' && (
                <p className="text-xs text-red-500 mt-1">Required field</p>
              )}
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => updateFormData('keywords', e.target.value)}
                placeholder="Enter keywords (comma-separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Abstract */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Abstract <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.abstract}
                onChange={(e) => updateFormData('abstract', e.target.value)}
                placeholder="Enter paper abstract (max 300 words)"
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                {formData.abstract === '' ? (
                  <p className="text-xs text-red-500">Required field</p>
                ) : (
                  <p className={`text-xs ${abstractWordCount > 300 ? 'text-red-500' : 'text-gray-500'}`}>
                    {abstractWordCount} / 300 words
                  </p>
                )}
              </div>
            </div>

            {/* keywords */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter paper keywords"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {keywords === '' && (
                <p className="text-xs text-red-500 mt-1">Required field</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={`px-8 py-4 rounded-lg font-semibold text-white text-lg transition-all ${
              isFormValid() && !isSubmitting
                ? 'cursor-pointer shadow-lg hover:shadow-xl'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ 
              backgroundColor: (isFormValid() && !isSubmitting) ? '#001F3F' : '#6B7280'
            }}
            onMouseEnter={(e) => {
              if (isFormValid() && !isSubmitting) e.target.style.backgroundColor = '#003366';
            }}
            onMouseLeave={(e) => {
              if (isFormValid() && !isSubmitting) e.target.style.backgroundColor = '#001F3F';
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Paper'}
          </button>
        </div>
      </div>
    </div>
  );
}