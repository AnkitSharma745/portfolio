import Link from "next/link";

function ReadyToBuild() {
    return (
        <section

            className="w-full min-h-screen pt-20 pb-0 px-6 md:px-20 transition-colors duration-300 bg-background text-foreground"
        >

            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20 backdrop-blur-lg">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Let&apos;s discuss how I can bring the same level of excellence and
                            innovation to your next project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full font-semibold text-lg text-black hover:shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                    Let&apos;s Connect
                                </button>
                            </Link>
                            <Link href="/projects">
                                <button className="px-8 py-4 border-2 border-primary rounded-full font-semibold text-lg text-primary hover:bg-primary/10 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                    View All Projects
                                </button>
                            </Link>
                            <Link href="/experience">
                                <button className="px-8 py-4 border-2 border-accent rounded-full font-semibold text-lg text-accent hover:bg-accent/10 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                    View Experience
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    )

}
export default ReadyToBuild