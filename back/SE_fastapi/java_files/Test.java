public class Test{
    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        long duration = 3000; // 3 seconds in milliseconds

        while (System.currentTimeMillis() - startTime < duration) {
            // CPU-intensive computation: Calculating prime numbers
            calculatePrimeNumbers();
        }
        System.out.println("끝!");
    }

    // CPU-intensive calculation of prime numbers
    private static void calculatePrimeNumbers() {
        int limit = 10000; // You can adjust this to control the intensity
        for (int number = 2; ; number++) {
            boolean isPrime = true;
            for (int divisor = 2; divisor < number; divisor++) {
                if (number % divisor == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                limit--;
                if (limit == 0) {
                    break;
                }
            }
        }
    }
}