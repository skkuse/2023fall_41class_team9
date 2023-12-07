package run_time;

public class Main {
    public static void main(String[] args) {
    	String beforejarPath = "C:\\Users\\User\\Desktop\\jar file\\before_test20.jar";
        String afterjarPath = "C:\\Users\\User\\Desktop\\jar file\\after_test20.jar"; // jar 파일 경로 설정

        int numExecutions = 100; // 실행 횟수 설정
        long beforetotalRuntime = 0;
        long aftertotalRuntime = 0;

        for (int i = 0; i < numExecutions; i++) {
            long beforestartTime = System.currentTimeMillis();

            // ProcessBuilder를 사용하여 jar 파일 실행
            try {
                ProcessBuilder beforeprocessBuilder = new ProcessBuilder("java", "-jar", beforejarPath);
                Process beforeprocess = beforeprocessBuilder.start();
                beforeprocess.waitFor(); // 프로세스가 완료될 때까지 기다림

                long beforeendTime = System.currentTimeMillis();
                long beforeexecutionTime = beforeendTime - beforestartTime;
                beforetotalRuntime += beforeexecutionTime;
                System.out.println("실행 시간 " + (i + 1) + ": " + beforeexecutionTime + "ms");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        double beforeaverageRuntime = (double) beforetotalRuntime / numExecutions;
        System.out.println("Before 평균 실행 시간: " + beforeaverageRuntime + "ms");
        
        for (int i = 0; i < numExecutions; i++) {
            long afterstartTime = System.currentTimeMillis();

            // ProcessBuilder를 사용하여 jar 파일 실행
            try {
                ProcessBuilder afterprocessBuilder = new ProcessBuilder("java", "-jar", afterjarPath);
                Process afterprocess = afterprocessBuilder.start();
                afterprocess.waitFor(); // 프로세스가 완료될 때까지 기다림

                long afterendTime = System.currentTimeMillis();
                long afterexecutionTime = afterendTime - afterstartTime;
                aftertotalRuntime += afterexecutionTime;
                //System.out.println("실행 시간 " + (i + 1) + ": " + executionTime + "ms");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        double afteraverageRuntime = (double) aftertotalRuntime / numExecutions;
        System.out.println("After 평균 실행 시간: " + afteraverageRuntime + "ms");
        
        
        System.out.println((beforeaverageRuntime/3600000)* (15*1+4.0975)*1.67*100*500*0.001);
        System.out.println((afteraverageRuntime/3600000)* (15*1+4.0975)*1.67*100*500*0.001);
    }
}

