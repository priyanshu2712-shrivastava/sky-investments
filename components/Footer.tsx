export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-serif font-bold text-white mb-4">Sky Investment</h3>
                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            Providing institutional-grade market analysis and long-term investment strategies for the intelligent investor. navigating complexity with clarity.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Explore</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="/articles" className="hover:text-blue-400 transition-colors">Market Insights</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Investment Philosophy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Disclaimer</a></li>
                            <li><a href="/login" className="hover:text-blue-400 transition-colors">Admin Login</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Sky Investment. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex gap-6">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
