import { useState, useMemo } from 'react';
import { NAMES_LIST } from '../../utils/constants';
import { Search, Users, Hash, AlertCircle } from 'lucide-react';

const HighlightedText = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default function SearchList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return NAMES_LIST;

    return NAMES_LIST.filter(name => {
      const searchIn = caseSensitive ? name : name.toLowerCase();
      const searchFor = caseSensitive ? searchQuery : searchQuery.toLowerCase();
      return searchIn.includes(searchFor);
    });
  }, [searchQuery, caseSensitive]);

  const getOccurrences = (name) => {
    const searchIn = caseSensitive ? name : name.toLowerCase();
    const searchFor = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    const regex = new RegExp(searchFor, 'g');
    const matches = searchIn.match(regex);
    return matches ? matches.length : 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-8">
        <Search className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Live Search with Highlighting</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search names..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setCaseSensitive(!caseSensitive)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  caseSensitive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {caseSensitive ? 'Aa' : 'aa'}
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                <span>Total names: {NAMES_LIST.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Found: {filteredNames.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{caseSensitive ? 'Case sensitive' : 'Case insensitive'}</span>
              </div>
            </div>
          </div>

          {searchQuery.trim() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-blue-700">Search Query</p>
                  <p className="text-lg font-bold text-blue-900">{searchQuery}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Results Found</p>
                  <p className="text-lg font-bold text-blue-900">{filteredNames.length}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Search Mode</p>
                  <p className="text-lg font-bold text-blue-900">
                    {caseSensitive ? 'Aa (Sensitive)' : 'aa (Insensitive)'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Matching Names ({filteredNames.length})
              </h3>
              {filteredNames.length > 0 && (
                <span className="text-sm text-gray-500">
                  Showing {filteredNames.length} of {NAMES_LIST.length}
                </span>
              )}
            </div>

            {filteredNames.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-gray-500 mb-2">
                  No matches found
                </h4>
                <p className="text-gray-400">
                  Try a different search term or turn off case sensitivity
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">#</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Occurrences</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredNames.map((name, index) => {
                      const occurrences = getOccurrences(name);
                      return (
                        <tr key={name} className="hover:bg-gray-100 transition-colors">
                          <td className="py-3 px-4 text-gray-600 font-mono">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="text-gray-800">
                              <HighlightedText text={name} highlight={searchQuery} />
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                {occurrences}
                              </div>
                              <span className="text-sm text-gray-600">
                                {occurrences} match{occurrences !== 1 ? 'es' : ''}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{name.length} chars</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {filteredNames.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">First Match</h4>
                <p className="text-green-900">
                  <HighlightedText text={filteredNames[0]} highlight={searchQuery} />
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Last Match</h4>
                <p className="text-purple-900">
                  <HighlightedText 
                    text={filteredNames[filteredNames.length - 1]} 
                    highlight={searchQuery} 
                  />
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Most Occurrences</h4>
                <p className="text-yellow-900">
                  {(() => {
                    const mostOccurrences = Math.max(
                      ...filteredNames.map(name => getOccurrences(name))
                    );
                    const nameWithMost = filteredNames.find(
                      name => getOccurrences(name) === mostOccurrences
                    );
                    return (
                      <>
                        <HighlightedText text={nameWithMost} highlight={searchQuery} />
                        <span className="block text-sm text-yellow-700 mt-1">
                          ({mostOccurrences} occurrence{mostOccurrences !== 1 ? 's' : ''})
                        </span>
                      </>
                    );
                  })()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}