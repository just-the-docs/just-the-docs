import docker

client = docker.from_env()

def create_container(container_name, image):
    container = client.containers.run(
        image=image,
        name=container_name,
        command="sleep infinity",
        detach=True
    )
    print(f"Container '{ container_name }' created.")
    return container

def execute_in_container(container, command):
    exec_result = container.exec_run(command, stdout=True, stderr=True)
    print(f"Container '{ container_name }': Command '{ command } execution output:\n{ exec_result .output.decode() }")

def stop_container(container):
    container.stop()
    container.remove()
    print(f"Container '{ container_name } has stopped.")

def main():
    container_name = "python-3-9"
    image = "python:3.9"
    container = create_container(container_name, image)
    try:
        result = container.exec_run("pip --version", stdout=True, stderr=True)        
        print(result.output.decode())

        res = container.exec_run("pip install -v duckdb --pre --upgrade", stdout=True, stderr=True)
        print("📌", res.output.decode())
        result = container.exec_run(
            "python -c \"import duckdb; print(duckdb.sql('SELECT source_id FROM pragma_version()').fetchone()[0])\"",
            stdout=True, stderr=True
        )
        print(f"Result: { result.output.decode() }")
        
        short_sha = result.output.decode().strip()
        FULL_SHA='4488c61ee780635e67abe1b6164f2cdfadc21b65'
        if FULL_SHA.startswith(short_sha):
            print("🦑")
    finally:
        container.stop()
        container.remove()


if __name__ == "__main__":
    main()